from django.shortcuts import render, get_object_or_404

from django.http import JsonResponse
from .models import Task
import json


def index(request):
    # Fetch all tasks, not just for a specific user.
    tasks = Task.objects.all().order_by('-created_at') 
    return render(request, 'index.html', {'tasks': tasks})


def add_task(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        # Create a task without associating it with a user.
        task = Task.objects.create(title=data['title'])
        return JsonResponse({'id': task.id, 'title': task.title})
    return JsonResponse({'error': 'Invalid request'}, status=400)


def update_task(request, task_id):
    # Get the task by its ID only.
    task = get_object_or_404(Task, id=task_id)
    if request.method == 'POST':
        data = json.loads(request.body)
        task.completed = data.get('completed', task.completed)
        task.save()
        return JsonResponse({'status': 'success'})
    return JsonResponse({'error': 'Invalid request'}, status=400)


def delete_task(request, task_id):
    # Get the task by its ID only.
    task = get_object_or_404(Task, id=task_id)
    if request.method == 'POST':
        task.delete()
        return JsonResponse({'status': 'success'})
    return JsonResponse({'error': 'Invalid request'}, status=400)