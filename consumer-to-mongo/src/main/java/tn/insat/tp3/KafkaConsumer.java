package tn.insat.tp3;

import org.apache.spark.SparkConf;
import org.apache.spark.streaming.Duration;
import org.apache.spark.streaming.api.java.*;
import org.apache.spark.streaming.kafka.KafkaUtils;

import scala.Tuple2;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
public class KafkaConsumer {
    private static final Pattern SPACE = Pattern.compile(" ");

    private KafkaConsumer() {
    }
    public static void insertIntoPostsCollection(String post){
        String[] fields = post.split(",");
        String id = fields[0];
        String parent_id = fields[1];
        String body = fields[4];
        String subreddit = fields[2];
        String created = fields[3];
        String connectionString = "mongodb://mongodb2:27017";
        MongoClientURI uri = new MongoClientURI(connectionString);
        try (MongoClient mongoClient = new MongoClient(uri)) {
            MongoDatabase database = mongoClient.getDatabase("bigdata");
            MongoCollection<Document> collection = database.getCollection("posts");
            Document doc = new Document("post", body).append("parent_id", parent_id).append("subreddit", subreddit).append("created",created);
            collection.insertOne(doc);
            System.out.println("Document inserted successfully for "+id);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public static void main(String[] args) throws Exception {

        if (args.length < 4) {
            System.err.println("Usage: SparkKafkaWordCount <zkQuorum> <group> <topics> <numThreads>");
            System.exit(1);
        }

        SparkConf sparkConf = new SparkConf().setAppName("SparkKafkaWordCount");
        // Creer le contexte avec une taille de batch de 2 secondes
        JavaStreamingContext jssc = new JavaStreamingContext(sparkConf,
                new Duration(2000));

        int numThreads = Integer.parseInt(args[3]);
        Map<String, Integer> topicMap = new HashMap<>();
        String[] topics = args[2].split(",");
        for (String topic: topics) {
            topicMap.put(topic, numThreads);
        }

        JavaPairReceiverInputDStream<String, String> messages =
                KafkaUtils.createStream(jssc, args[0], args[1], topicMap);

        JavaDStream<String> lines = messages.map(Tuple2::_2);
        System.out.println(messages);
        lines.foreachRDD(rdd -> {
            rdd.foreach(line -> {
                // execute your code here for each line
                System.out.println(line);
                insertIntoPostsCollection(line);
            });
        });

/*
        JavaDStream<String> words =
                lines.flatMap(x -> Arrays.asList(SPACE.split(x)).iterator());

       JavaPairDStream<String, Integer> wordCounts =
                words.mapToPair(s -> new Tuple2<>(s, 1))
                        .reduceByKey((i1, i2) -> i1 + i2);*/

        /*wordCounts.print();*/
        jssc.start();
        jssc.awaitTermination();
    }
}
