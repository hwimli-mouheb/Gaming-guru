package tn.insat.batch;

import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;

import java.io.IOException;
import java.util.Map;

public class TokenizerMapper extends Mapper<Object, Text, Text, IntWritable> {

    private final static IntWritable one = new IntWritable(1);
    private Text word = new Text();

    public void map(Object key, Text value, Mapper.Context context
    ) throws IOException, InterruptedException {
        // SentimentAnalyzer singleton
        SentimentAnalyzer sentimentAnalyzer = SentimentAnalyzer.getInstance();

        // remove subreddit ("?,r\/\w+)
        // remove ids \d,\w+,\w+,"?
        String cleanReview = value.toString()
                .replaceAll("\"?,r\\/\\w+", "")
                .replaceAll("\\d+,\\w+,\\w+,\"?", "");
        System.out.println("cleanReview: " + cleanReview);
        for (Map.Entry<String, Integer> entry : sentimentAnalyzer.getSentiment(cleanReview).entrySet()) {
            String k = entry.getKey();
            Integer v = entry.getValue();
            word.set(k);
            context.write(word, new IntWritable(v));
            // (Sentiment, Count)
        }
    }
}