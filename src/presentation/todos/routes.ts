import { Router } from "express";
import { TodoController } from "./controller";



export class TodoRoutes {

    static get routes(): Router {

        const router = Router();
        const todoController = new TodoController();

        router.get('/', ( req, res ) => todoController.getTodos( req, res ) );
        router.get('/:id', todoController.getTodoById );
        
        router.post('/', todoController.createTodo );

        router.put('/:id', todoController.updateTodo );

        router.delete('/:id', todoController.deleteTodo );


        return router;


    }



}