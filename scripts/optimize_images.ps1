Add-Type -AssemblyName System.Drawing

$productsDir = "c:\Users\RYESA\Documents\sindy luxury\public\products"
$files = Get-ChildItem -Path $productsDir -File

Write-Host "Optimizing $($files.Count) product images for ultra-fast loading..."

# Setup Encoder for Quality = 65 (high compression, ultra-fast download)
$encoder = [System.Drawing.Imaging.Encoder]::Quality
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, 65)

$jpgCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }

$totalSavedBytes = 0

foreach ($file in $files) {
    try {
        $origSize = $file.Length
        $img = [System.Drawing.Image]::FromFile($file.FullName)
        
        # Max dimension 600px (perfect for retina grid cards)
        $maxWidth = 600
        $maxHeight = 600
        
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
        $graph.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighSpeed
        $graph.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighSpeed
        $graph.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighSpeed
        
        $graph.DrawImage($img, 0, 0, $newWidth, $newHeight)
        
        $img.Dispose()
        $graph.Dispose()
        
        $tempPath = "$($file.FullName).tmp"
        $bmp.Save($tempPath, $jpgCodec, $encoderParams)
        $bmp.Dispose()
        
        Remove-Item -Path $file.FullName -Force
        Move-Item -Path $tempPath -Destination $file.FullName -Force
        
        $newSize = (Get-Item $file.FullName).Length
        $totalSavedBytes += ($origSize - $newSize)
    } catch {
        Write-Host "Error processing $($file.Name): $_"
    }
}

$savedMB = ($totalSavedBytes / 1MB).ToString("0.00")
Write-Host "Image optimization complete! Saved $savedMB MB."
