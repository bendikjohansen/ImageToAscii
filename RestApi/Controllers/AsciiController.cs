using System.ComponentModel.DataAnnotations;
using Core;
using Microsoft.AspNetCore.Mvc;

namespace RestApi.Controllers;

[Route("api/[controller]")]
public class AsciiController : ControllerBase
{
    private readonly IAsciiRepresentationPipeline _asciiRepresentation;

    public AsciiController(IAsciiRepresentationPipeline asciiRepresentation)
    {
        _asciiRepresentation = asciiRepresentation;
    }

    [HttpPost]
    public async Task<ActionResult<string>> ConvertToAscii([FromForm] AsciiImageRequest request)
    {
        var (file, brightness, contrast, width) = request;
        var ascii = await _asciiRepresentation.ToAsciiRepresentation(file.OpenReadStream(),
            new(contrast, brightness, width));
        return Ok(ascii);
    }
}

public record AsciiImageRequest([Required] IFormFile File, float? Brightness, float? Contrast, int? Width);