from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to the E-commerce Platform! Navigate to /admin or /api/users/ to explore.")

from django.shortcuts import redirect

def home_redirect(request):
    return redirect('/admin/')
