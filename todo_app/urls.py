from django.urls import path
from . import views

# This defines the URL patterns for the to-do app.
# Each path is connected to a specific view function.
urlpatterns = [
    # The root URL ('/') will show the main task list.
    path('', views.index, name='index'),
    
    # The '/add/' URL is used to handle the creation of a new task.
    path('add/', views.add_task, name='add_task'),
    
    # The '/update/<int:task_id>/' URL handles marking a task as complete.
    # The <int:task_id> part captures the unique ID of the task.
    path('update/<int:task_id>/', views.update_task, name='update_task'),
    
    # The '/delete/<int:task_id>/' URL handles deleting a task.
    path('delete/<int:task_id>/', views.delete_task, name='delete_task'),
]