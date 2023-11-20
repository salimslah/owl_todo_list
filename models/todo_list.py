from odoo import fields , models

class Owltodo(models.Model):
    _name = 'todo.list'
    _description = 'this is to do list with owl and odoo'


    name = fields.Char(string = "Task Name")
    completed = fields.Boolean()
    color = fields.Char()
