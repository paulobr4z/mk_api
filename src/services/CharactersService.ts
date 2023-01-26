import Character from '../models/CharactersModel';
import { ICharacter, IPagination } from '../types';

async function findAll({ limit, offset }: IPagination) {
  return await Character.find().skip(Number(offset)).limit(Number(limit));  
}

async function findById(id: string) {
  return await Character.findById(id);  
}

async function findByGame(game: string) {
  return await Character.find({games: game});
}

async function findByName(name: string) {
  return await Character.findOne({name: { $regex : new RegExp(name, "i") } });
}

async function countCharacters() {
  return await Character.countDocuments();
}

async function create(CharacterInfo: ICharacter) {
  return await Character.create(CharacterInfo);  
}

export default { 
  create,
  findAll,
  findById,
  findByName,
  findByGame,
  countCharacters
};