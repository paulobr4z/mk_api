import { Request, Response } from "express";
import mongoose from "mongoose";
import CharactersService from "../services/CharactersService";
import { ICharacter, IPagination } from "../types";

interface IParams {
  params: String;
}

class CharacterController {
  async findAll (request: Request, response:Response) {
    let { limit, offset } = request.query as unknown as IPagination;
    let total = await CharactersService.countCharacters();
    const currentUrl = request.baseUrl;

    limit = Number(limit);
    offset = Number(offset);

    if (!limit) limit = 10;
    if (!offset) offset = 0;

    const next = Number(offset) + Number(limit);
    const nextURl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const prev = Number(offset) - Number(limit) < 0 ? null : Number(offset) - Number(limit);
    const prevURl = prev != null ? `${currentUrl}?limit=${limit}&offset=${prev}` : null;

    try {
      const characters = await CharactersService.findAll({ limit, offset });

      if (characters.length === 0) {
        return response.status(400).json({
          message: 'There are no registered users!'
        })
      }

      return response.json({
        count: total,
        pages: Math.ceil(total / 10),
        next: nextURl,
        prev: prevURl,
        data: characters,
      });

    } catch (error) {
      return response.status(500).send({
        error: "Internal Server Error!",
        message: error
      })      
    }
  }

  async findOne (request:Request, response:Response) {
    const { params } = request.params as unknown as IParams;

    if (mongoose.Types.ObjectId.isValid(`${params}`)) {
      try {
        const character = await CharactersService.findById(`${params}`);
  
        if (!character) {
          return response.status(400).json({
            message: 'User not found!'
          })
        }
  
        return response.json(character);
      } catch (error) {
        return response.status(500).send({
          error: "Internal Server Error!",
          message: error
        })      
      }
    } else {
      try {
        const character = await CharactersService.findByName(`${params}`);
  
        if (!character) {
          return response.status(400).json({
            message: 'User not found!'
          })
        }
  
        return response.json(character);
      } catch (error) {
        return response.status(500).send({
          error: "Internal Server Error!",
          message: error
        })      
      }
    }
  }

  async findByGame (request:Request, response:Response) {
    try {
      const { params } = request.params;
      const characters = await CharactersService.findByGame(params.toUpperCase());

      return response.json({
        count: characters.length,
        data: characters,
      });

      return response.json(characters);
    } catch (error) {
      console.log(error)      
    }

  }

  async create (request:Request, response:Response) {    
    try {
      const characterInfo:ICharacter = request.body;
      const character = await CharactersService.create(characterInfo);
      return response.status(201).json(character);
    } catch (error) {
      return response.status(500).send({
        error: "Internal Server Error!",
        message: error
      })      
    }
  }
}

export default new CharacterController;