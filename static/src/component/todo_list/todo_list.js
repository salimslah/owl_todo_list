/**@odoo-module **/
import {registry} from '@web/core/registry'
const {Component , useState , onWillStart ,useRef} = owl;
import {useService} from "@web/core/utils/hooks";

export class OwlTodoList extends Component {

    setup() {
        this.state = useState({
            task:{name :"" , color :"#FFCA71" , completed :false}, //defult value
            taskList :[],
            isEdit :false,
            activedId : false,

        })
        
        this.orm = useService("orm");
        this.model = 'todo.list';
        this.seachInput = useRef('search-input')

        onWillStart(async () => {
              await this.getAllTasks()
              
        });
    } 
    
    async getAllTasks(){
            this.state.taskList = await this.orm.searchRead(this.model, [], ['name', 'color', 'completed']);//async to odoo DB by using  onWillStart  this.model id teaken from python _name
           
        }

        AddTask(){

            this.restTask()
            this.state.activedId = false
            this.state.isEdit = false

        }// this is done when click on new button (rest all prevose stteings)

        EditTask(task){
            this.state.activedId = task.id //that is in  foreach
            this.state.isEdit = true
            this.state.task={...task}
        } //this function is done when click on edit button  then click on Save changes button in viwe notes it based on SaveTask function

    async SaveTask(){
        if(!this.state.isEdit){
            await this.orm.create(this.model,[this.state.task])
        }else{
             await this.orm.write(this.model,[this.state.activedId],this.state.task)
        }

        await this.getAllTasks()
        
     }  //this function is don when click on Save changes button in viwe
     
    
    async DeletTask(task){
        await this.orm.unlink(this.model,[task.id])
        await this.getAllTasks()
    }

     restTask(){
        this.state.task = {name :"" , color :"#FFCA71" , completed :false}} //defult value

    async seachTasks(){
        const text =  this.seachInput.el.value 
            this.state.taskList = await this.orm.searchRead(this.model, [['name','ilike',text]], ['name', 'color', 'completed']);
        }

        async tooglebox(e, task) {
            await this.orm.write(this.model, [task.id], { completed:e.target.checked});
            await this.getAllTasks()
        }

        async colorbox(e, task) {
            await this.orm.write(this.model, [task.id], { color:e.target.value});
            await this.getAllTasks()
        }
       
}   



OwlTodoList.template = 'owl.TodoList'
registry.category('actions').add('owl.action_todo_list_js', OwlTodoList);