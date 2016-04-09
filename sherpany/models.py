#!/usr/bin/env python
# -*- coding:utf-8 -*-

""" Sherpany models """

from django.db import models

# Create your models here.
class Point(models.Model):
    """ Class used to store a point """
    lng = models.CharField(max_length=200)
    lat = models.CharField(max_length=200)
    types = models.CharField(max_length=200)
    address = models.CharField(max_length=200)

    def __str__(self):
        return "%s: %s" % (self.types, self.address)
