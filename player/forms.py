from django.forms import ClearableFileInput, FileField, Form


class MultiFileForm(Form):
    file = FileField(widget=ClearableFileInput(attrs={'multiple': True}))
