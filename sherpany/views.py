#!/usr/bin/env python
# -*- coding:utf-8 -*-

""" Sherpany views """

from django.shortcuts import render
from django.http import JsonResponse
from .models import Point

# Create your views here.

def index(request):
    """index view"""
    return render(request, 'sherpany/index.html')


def store(request):
    json_data = []
    if request.method == "POST" and request.is_ajax():
        # we should validate data before storage
        myDict = dict(request.POST.dict())
        print(myDict)
        point = Point()
        point.lng = myDict['lng']
        point.lat = myDict['lat']
        point.types = myDict['types[]']
        point.address = myDict['address']
        point.save()

        # use a celery task to send data to fusion table
    else:
        json_data.append({'error': "You're the lying type, I can just tell."})
    return JsonResponse(data=json_data, safe=False)


def reset(request):
    """ delete all points"""
    json_data = []
    if request.method == "POST" and request.is_ajax():
        for p in Point.objects.all():
            p.delete()
        # use a celery task to drop all point iside the fusion table
    else:
        json_data.append({'error': "You're the lying type, I can just tell."})
    return JsonResponse(data=json_data, safe=False)
