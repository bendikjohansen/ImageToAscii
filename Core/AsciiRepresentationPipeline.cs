using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;

namespace Core;

public interface IAsciiRepresentationPipeline
{
    Task<string> ToAsciiRepresentation(Stream imageStream, ImageProperties imageProperties);
}

public class AsciiRepresentationPipeline : IAsciiRepresentationPipeline
{
    private readonly IImageToAsciiConverter _imageToAsciiConverter;

    public AsciiRepresentationPipeline(IImageToAsciiConverter imageToAsciiConverter)
    {
        _imageToAsciiConverter = imageToAsciiConverter;
    }

    public async Task<string> ToAsciiRepresentation(Stream imageStream, ImageProperties imageProperties)
    {
        var (contrast, brightness, width) = imageProperties;
        var originalImage = await Image.LoadAsync<Rgba32>(imageStream);
        var image = new ImageBuilder(originalImage)
            .WithBrightness(brightness)
            .WithContrast(contrast)
            .WithWidth(width)
            .Build();

        var asciiRepresentation = _imageToAsciiConverter.Convert(image);
        return asciiRepresentation;
    }
}

public record ImageProperties(float? Contrast, float? Brightness, int? Width);