# @receiver(post_save, sender=User)
# def create_admin_profile(sender, instance, created, **kwargs):
#     if created and instance.role and instance.role.name.lower() == 'admin':
#         AdminProfile.objects.create(user=instance)

# support/signals.py
from django.dispatch import receiver
from django.contrib.auth.signals import user_logged_in
from Support.models import Ticket

@receiver(user_logged_in)
def assign_tickets_to_user(sender, request, user, **kwargs):
    if hasattr(user, 'phone_number') and user.phone_number:
        Ticket.objects.filter(phone_number=user.phone_number, user__isnull=True).update(user=user)
