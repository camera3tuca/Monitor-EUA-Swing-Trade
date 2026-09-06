import os
import zipfile

public_dir = os.path.join(os.getcwd(), 'public')
zip_path = os.path.join(public_dir, 'wallstreet-scanner-playstore-assets.zip')

files_to_zip = [
    'LEIA-ME-INSTRUCOES.txt',
    'playstore-icon-512.png',
    'playstore-feature-graphic-1024x500.png',
    'icon-512.png',
    'icon-192.png',
    'icon.svg',
    'screenshot-wide.png',
    'screenshot-mobile.png',
    'screenshot-1-scanner.png',
    'screenshot-2-indicadores.png',
    'screenshot-3-ia-modelos.png',
    'screenshot-4-triple-screen.png',
    'sciencebit-logo.svg',
    'sciencebit-logo-white.svg',
    'sciencebit-logo.png',
    'sciencebit-logo-white.png',
    'privacy.html',
    'manifest.json'
]

if os.path.exists(zip_path):
    os.remove(zip_path)

with zipfile.ZipFile(zip_path, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=9) as zf:
    for filename in files_to_zip:
        file_full_path = os.path.join(public_dir, filename)
        if os.path.exists(file_full_path):
            zf.write(file_full_path, arcname=filename)
            print(f"Added {filename} ({os.path.getsize(file_full_path)} bytes)")
        else:
            print(f"Warning: {filename} not found")

print(f"Zip successfully created at {zip_path} ({os.path.getsize(zip_path)} bytes)")
