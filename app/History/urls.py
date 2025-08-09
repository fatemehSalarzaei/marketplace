# urls.py

from django.urls import path
from History.Views import RecentViewListCreateView

urlpatterns = [
    path("recent-views/", RecentViewListCreateView.as_view(), name="recent-views"),
]