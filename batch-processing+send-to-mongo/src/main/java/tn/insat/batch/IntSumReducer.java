package tn.insat.batch;

import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;

import java.io.IOException;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
public class IntSumReducer
        extends Reducer<Text,IntWritable,Text,IntWritable> {

    private IntWritable result = new IntWritable();
    private String game;
    public static void insertIntoGamesCollection(int sum, String sentiment, String game) {
        String connectionString = "mongodb://localhost:27017/bigdata";
        MongoClientURI uri = new MongoClientURI(connectionString);
        try (MongoClient mongoClient = new MongoClient(uri)) {
            MongoDatabase database = mongoClient.getDatabase("bigdata");
            MongoCollection<Document> collection = database.getCollection("games");
            Document doc = new Document("game", game).append("sentiment", sentiment).append("sum",sum);
            collection.insertOne(doc);
            System.out.println("Document inserted successfully");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public void reduce(Text key, Iterable<IntWritable> values,
                       Context context
    ) throws IOException, InterruptedException {
        game = context.getConfiguration().get("game");
        int sum = 0;
        for (IntWritable val : values) {
            System.out.println("value: "+val.get());
            sum += val.get();
        }
        System.out.println("--> Sum = "+sum);
        System.out.println("sentiment: "+key);
        insertIntoGamesCollection(sum,key.toString(),game);
        result.set(sum);
        context.write(key, result);
    }
}