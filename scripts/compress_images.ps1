Add-Type -AssemblyName System.Drawing

$targetFolder = "c:\Users\RYESA\Documents\sindy luxury\public\products"
$encoder = [System.Drawing.Imaging.Encoder]::Quality
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, [long]65)
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }

Get-ChildItem -Path $targetFolder -File | ForEach-Object {
    try {
        $bytes = [System.IO.File]::ReadAllBytes($_.FullName)
        $ms = New-Object System.IO.MemoryStream(,$bytes)
        $img = [System.Drawing.Image]::FromStream($ms)
        
        $maxDim = 500
        $w = $img.Width
        $h = $img.Height
        if ($w -gt $maxDim -or $h -gt $maxDim) {
            if ($w -gt $h) {
                $newW = $maxDim
                $newH = [int]($h * ($maxDim / $w))
            } else {
                $newH = $maxDim
                $newW = [int]($w * ($maxDim / $h))
            }
        } else {
            $newW = $w
            $newH = $h
        }

        $bmp = New-Object System.Drawing.Bitmap($newW, $newH)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.DrawImage($img, 0, 0, $newW, $newH)
        $g.Dispose()
        $img.Dispose()
        $ms.Dispose()

        $bmp.Save($_.FullName, $codec, $encoderParams)
        $bmp.Dispose()
    } catch {
        Write-Host "Error processing $($_.Name): $_"
    }
}
