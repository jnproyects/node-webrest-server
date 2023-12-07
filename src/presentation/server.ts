import express, { Router } from "express";
import path from "path";

interface Options {
    port: number;
    publicPath?: string;
    routes: Router;
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor( options: Options ){
        const { port, publicPath = 'public', routes } = options;
        this.port = port;
        this.publicPath = publicPath;
        this.routes = routes;
    }

    async start() {

        //* Middlewares
        this.app.use( express.json() ); // raw
        this.app.use( express.urlencoded({ extended: true }) ); // x-wwww-form-urlencoded

        //* Public Folder
        this.app.use( express.static( this.publicPath ) );

        //* Routes
        this.app.use( this.routes );
        
        //* Cualquier ruta no esté definida pasa por acá (ayuda a los SPA)
        this.app.get('*', (req, res) => {
            const indexPath = path.join( `${ __dirname }../../../${ this.publicPath }/index.html` );
            res.sendFile( indexPath );
        });

        this.app.listen( this.port, () => {
            console.log(`Server running on port: ${ this.port }`);
        });
        
    }


}