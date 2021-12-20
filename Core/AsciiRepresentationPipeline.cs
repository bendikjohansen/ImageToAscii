namespace Core;

public interface IAsciiRepresentationPipeline
{
    string ToAsciiRepresentation(Stream imageStream, ImageProperties imageProperties);
}

public class AsciiRepresentationPipeline : IAsciiRepresentationPipeline
{
    private readonly ImageToAsciiConverter _imageToAsciiConverter;

    public AsciiRepresentationPipeline(ImageToAsciiConverter imageToAsciiConverter)
    {
        _imageToAsciiConverter = imageToAsciiConverter;
    }

    public string ToAsciiRepresentation(Stream imageStream, ImageProperties imageProperties)
    {
        var (contrast, brightness, width) = imageProperties;
        var image = new ImageBuilder(imageStream)
            .WithBrightness(brightness)
            .WithContrast(contrast)
            .WithWidth(width)
            .Build();

        var asciiRepresentation = _imageToAsciiConverter.Convert(image);
        return asciiRepresentation;
    }
}

public record ImageProperties(float? Contrast, float Brightness, int Width);