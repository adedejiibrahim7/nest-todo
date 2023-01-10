import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { resourceLimits } from 'worker_threads';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
    constructor(private todoservice: TodoService){}


    @Post('/')
    async create(@Res() res, @Body() createTodoDTO: CreateTodoDTO){
        const newTodo = await this.todoservice.addTodo(createTodoDTO)

        return res.status(HttpStatus.CREATED).json({
            message: 'Todo has been created successfully',
            todo: newTodo
        })

    }

    @Get(':todoID')
    async getTodo(@Res() res, @Param('todoID') todoID) {
        const todo = await this.todoservice.getTodo(todoID)

        if(!todo){
            throw new NotFoundException('Todo does not exist!')
        }

        return res.status(HttpStatus.OK).json(todo)
    }

    @Get('')
    async findAll(@Res() res){
        const todos = this.todoservice.getTodos()

        return res.status(HttpStatus.OK).json(todos)
    }


    @Patch('/')
    async editTodo(
        @Res() res,
        @Query('todoID') todoID,
        @Body() createTodoDTO: CreateTodoDTO
    ) {
        const editedTodo = this.todoservice.editTodo(todoID, createTodoDTO)

        if(!editedTodo){
            throw new NotFoundException('Todo does not exist')
        }

        return res.status(HttpStatus.OK).json({
            message: 'Todo has been successfully updated',
            todo: editedTodo
        })
    }

    @Delete('/')
   async deleteTodo(@Res() res, @Query('todoID') todoID) {
    const deletedTodo = await this.todoservice.deleteTodo(todoID)

    if(!deletedTodo){
        throw new NotFoundException('Todo does not exit')
    }

    res.status(HttpStatus.OK).json({
        message: 'Todo has been deleted',
        todo: deletedTodo
    })
   }
}
