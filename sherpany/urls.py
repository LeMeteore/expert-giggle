#!/usr/bin/env python
# -*- coding:utf-8 -*-

""" Sherpany application urls """

from django.conf.urls import url
from .views import index, store

urlpatterns = [

    url(r'^$', index, name='index'),
    url(r'^store/$', store, name='store'),
    # url(r'^login/$', views.login, name='login'),
    # url(r'^logout/$', views.logout, name='logout'),
    # url(r'^catalog/pack/$', views.packs, name='packs'),
    # url(r'^catalog/photo/$', views.photos, name='photos'),

    # url(r'^catalog/pack/add/$', views.add_pack, {}, name='add_pack'),
    # url(r'^catalog/pack/edit/(?P<id>\d+)/$', views.add_pack, {}, name='edit_pack'),
]
