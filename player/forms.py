from django.forms import ClearableFileInput, FileField, Form


class MultiFileForm(Form):
    file_field = FileField(widget=ClearableFileInput(attrs={'multiple': True}))
