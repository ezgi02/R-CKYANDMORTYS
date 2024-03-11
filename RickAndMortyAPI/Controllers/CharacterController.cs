using Microsoft.AspNetCore.Mvc;
using RickAndMortyAPI.Helpers;
using RickAndMortyAPI.Models;
using RickAndMortyAPI.Services;

namespace RickAndMortyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CharacterController:ControllerBase
    {
        private readonly ICharacterService _characterService;

        public CharacterController(ICharacterService characterService)
        {
            _characterService = characterService ?? throw new ArgumentNullException(nameof(characterService));
        }
       
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Character>>> GetCharacters()
        {
            var characters = await _characterService.GetAllCharactersAsync();
            return Ok(characters);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Character>> GetCharacter(int id)
        {
            var character = await _characterService.GetCharacterByIdAsync(id);
            if (character == null)
            {
                return NotFound();
            }

            return Ok(character);
        }
        [HttpPost]
        public async Task<ActionResult<Character>> CreateCharacter(Character character)
        {
            var newCharacter = await _characterService.AddCharacterAsync(character);
            return CreatedAtAction(nameof(GetCharacter), new { id = newCharacter.Id }, newCharacter);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCharacter(int id, Character character)
        {
            var updatedCharacter = await _characterService.UpdateCharacterAsync(id, character);
            if (updatedCharacter == null)
            {
                return NotFound();
            }

            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCharacter(int id)
        {
            var result = await _characterService.DeleteCharacterAsync(id);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
