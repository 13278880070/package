import java.io.IOException;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;

public class Reducer1 extends Reducer<Text,Text,Text,Text>{

	private Text outKey = new Text();
	private Text outValue = new Text();
	// 要输出的key value

	@Override
	// key : 列号 		value : [行号_值,行号_值,行号_值,行号_值..]
	protected void reduce(Text key,Iterable<Text> values,Context context)
		throws IOException,InterruptedException{
			StringBuilder sb = new StringBuilder();
			for(Text text:values){
				// text : "行号_值"
				sb.append(text+",");
			}
			String line = null;
			if(sb.toString().endsWith(",")){
				line = sb.substring(0,sb.length()-1);
			}

			// 设置输出的 key
			outKey.set(key);
			outValue.set(line);

			// 进行输出
			context.write(outKey,outValue);
		}
}
