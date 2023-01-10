import { Injectable } from '@nestjs/common';
import { CreateTodoDTO } from './dto/create-todo.dto';


interface Todo {
    readonly id: number;
    readonly title: string;
    readonly description: string;
    readonly isDone: boolean;
}

@Injectable()
export class TodoService {

    private todos: Todo[] = [
        {
            id: 1,
            title: 'Test',
            description: 'This is a test Tod',
            isDone: true,
        }
    ]

    async addTodo(createTodoDTO: CreateTodoDTO): Promise<Todo> {
        this.todos.push(createTodoDTO);

        return this.todos.at(-1);
    }

    async getTodo(todoID: number): Promise<Todo>{
        const item = this.todos.find((todo) => todo.id === todoID)

        return item
    }

    async getTodos(): Promise<Todo[]> {
        return this.todos;
    }

    async editTodo(todoID: number, createTodoDTO: CreateTodoDTO): Promise<Todo> {
        await this.deleteTodo(todoID)
        this.todos.push(createTodoDTO)

        return this.todos.at(-1)
    }

    async deleteTodo(todoID: number): Promise<any> {
        const todoIndex = this.todos.findIndex(todo => todo.id === todoID)

        return this.todos.splice(todoIndex, 1)

    }

}
