Add-Type -AssemblyName System.Drawing

$productsDir = "c:\Users\RYESA\Documents\sindy luxury\public\products"
$files = Get-ChildItem -Path $productsDir -File

Write-Host "Compressing $($files.Count) product images..."

foreach ($file in $files) {
    try {
        $img = [System.Drawing.Image]::FromFile($file.FullName)
        
        # Max resolution 800px width/height for super fast web loading
        $maxWidth = 800
        $maxHeight = 800
        
        $newWidth = $img.Width
        $newHeight = $img.Height
        
        if ($newWidth -gt $maxWidth -or $newHeight -gt $maxHeight) {
            $ratioX = $maxWidth / $img.Width
            $ratioY = $maxHeight / $img.Height
            $ratio = [Math]::Min($ratioX, $ratioY)
            
            $newWidth = [int]($img.Width * $ratio)
            $newHeight = [int]($img.Height * $ratio)
        }
        
        $bmp = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
        $graph = [System.Drawing.Graphics]::FromImage($bmp)
        $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graph.DrawImage($img, 0, 0, $newWidth, $newHeight)
        
        $img.Dispose()
        $graph.Dispose()
        
        # Save compressed image back
        $bmp.Save($file.FullName, [System.Drawing.Imaging.ImageFormat]::Jpeg)
        $bmp.Dispose()
    } catch {
        # Skip if format not supported by System.Drawing
    }
}

Write-Host "Image compression complete!"
