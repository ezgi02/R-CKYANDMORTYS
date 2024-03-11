using RickAndMortyAPI.Models;

namespace RickAndMortyAPI.Services
{
    public interface IEpisodeService
    {
        Task<IEnumerable<Episode>> GetAllEpisodesAsync();
        Task<Episode> GetEpisodeByIdAsync(int id);
        Task<Episode> AddEpisodeAsync(Episode episode);
        Task<Episode> UpdateEpisodeAsync(int id, Episode episode);
        Task<bool> DeleteEpisodeAsync(int id);
    }
}
