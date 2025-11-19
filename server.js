import express from &quot;express&quot;;
import mongoose from &quot;mongoose&quot;;
import path from &quot;path&quot;;
import { fileURLToPath } from &quot;url&quot;;
import dotenv from &quot;dotenv&quot;;
import cors from &quot;cors&quot;;
dotenv.config();
const app = express();
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
mongoose.connect(process.env.MONGODB_URI, { dbName: &quot;BD-Nube-Lidia&quot; })
.then(() =&gt; console.log(&quot;Servidor conectado correctamente con MongoDB Atlas&quot;))
.catch(err =&gt; console.error(&quot;Error al conectar MongoDB:&quot;, err));
const Imagen = mongoose.model(&quot;Nube-1&quot;, new mongoose.Schema({
nombre: String,
url: String
}), &quot;Nube-1&quot;);
app.get(&quot;/api/images&quot;, async (req, res) =&gt; {
try {
const imagenes = await Imagen.find({});
res.json(imagenes);
} catch (error) {
res.status(500).json({ error: &quot;Error al obtener imágenes&quot; });
}
});
app.use(express.static(path.join(__dirname, &quot;public&quot;)));
app.get(&quot;*&quot;, (req, res) =&gt; {
res.sendFile(path.join(__dirname, &quot;public&quot;, &quot;index.html&quot;));
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =&gt; console.log(`Servidor iniciado en puerto ${PORT}`));
