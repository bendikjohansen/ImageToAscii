using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;

namespace Core;

public class ImageBuilder
{
    private readonly Image<Rgba32> _image;

    private float? _contrast;
    private float? _brightness;
    private int? _width;

    public ImageBuilder(Image<Rgba32> image)
    {
        _image = image.Clone();
    }

    public ImageBuilder WithContrast(float? contrast)
    {
        _contrast = contrast;
        return this;
    }

    public ImageBuilder WithBrightness(float? brightness)
    {
        _brightness = brightness;
        return this;
    }

    public ImageBuilder WithWidth(int? width)
    {
        _width = width;
        return this;
    }

    public Image<Rgba32> Build()
    {
        _image.Mutate(image => image
            .Resize(GetDownscaledSize(image.GetCurrentSize()))
            .Contrast(_contrast ?? 1)
            .Brightness(_brightness ?? 1));

        return _image;
    }

    private Size GetDownscaledSize(Size currentSize)
    {
        if (_width is { } width)
        {
            var proportion = width / currentSize.Width;
            return new(width, currentSize.Height * proportion);
        }

        return currentSize;
    }
}