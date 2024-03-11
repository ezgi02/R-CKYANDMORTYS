using Microsoft.EntityFrameworkCore;
using RickAndMortyAPI.Models;

namespace RickAndMortyAPI.Services
{
    public class EpisodeService:IEpisodeService
    {
        private readonly DataContext _context;

        public EpisodeService(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Episode>> GetAllEpisodesAsync()
        {
            return await _context.Episodes.ToListAsync();
        }

        public async Task<Episode> GetEpisodeByIdAsync(int id)
        {
            return await _context.Episodes.FindAsync(id);
        }

        public async Task<Episode> AddEpisodeAsync(Episode episode)
        {
            _context.Episodes.Add(episode);
            await _context.SaveChangesAsync();
            return episode;
        }

        public async Task<Episode> UpdateEpisodeAsync(int id, Episode episode)
        {
            if (id != episode.Id)
            {
                throw new ArgumentException("Id mismatch");
            }

            _context.Entry(episode).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EpisodeExists(id))
                {
                    return null;
                }
                else
                {
                    throw;
                }
            }

            return episode;
        }
        public async Task<bool> DeleteEpisodeAsync(int id)
        {
            var episode = await _context.Episodes.FindAsync(id);
            if (episode == null)
            {
                return false;
            }

            _context.Episodes.Remove(episode);
            await _context.SaveChangesAsync();
            return true;
        }

        private bool EpisodeExists(int id)
        {
            return _context.Episodes.Any(e => e.Id == id);
        }
    }
}
