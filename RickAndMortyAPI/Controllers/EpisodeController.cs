using Microsoft.AspNetCore.Mvc;
using RickAndMortyAPI.Models;
using RickAndMortyAPI.Services;

namespace RickAndMortyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EpisodeController:ControllerBase
    {
        private readonly IEpisodeService _episodeService;

        public EpisodeController(IEpisodeService episodeService)
        {
            _episodeService = episodeService ?? throw new ArgumentNullException(nameof(episodeService));
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Episode>>> GetEpisodes()
        {
            var episodes = await _episodeService.GetAllEpisodesAsync();
            return Ok(episodes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Episode>> GetEpisode(int id)
        {
            var episode = await _episodeService.GetEpisodeByIdAsync(id);
            if (episode == null)
            {
                return NotFound();
            }

            return Ok(episode);
        }
        [HttpPost]
        public async Task<ActionResult<Episode>> CreateEpisode(Episode episode)
        {
            var newEpisode = await _episodeService.AddEpisodeAsync(episode);
            return CreatedAtAction(nameof(GetEpisode), new { id = newEpisode.Id }, newEpisode);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEpisode(int id, Episode episode)
        {
            var updatedEpisode = await _episodeService.UpdateEpisodeAsync(id, episode);
            if (updatedEpisode == null)
            {
                return NotFound();
            }

            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEpisode(int id)
        {
            var result = await _episodeService.DeleteEpisodeAsync(id);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
