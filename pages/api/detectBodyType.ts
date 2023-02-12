// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/firebase';
import { setDoc, doc } from 'firebase/firestore';

type Data = {
  body_frame: string;
  body_build_and_musculature: string;
  complexion: string;
  skin: string;
  teeth: string;
  nails: string;
  eyes: string;
  lips: string;
  hair: string;
  weight: string;
  movements_and_physical_activities: string;
  tolerance_for_seasonal_weather: string;
  disease_resistant_and_healing_capacity: string;
  food_habits: string;
  appetite: string;
  digestion: string;
  bowel_movements: string;
  liking_towards_various_taste: string;
  communication_speech: string;
  capabilities_activity_level: string;
  memory_intellectual_level: string;
  ageing: string;
  emotions: string;
  sleep: string;
  personality_strengths: string;
  featured_traits: string;
  email: string;
};

interface ExtendedNextApiRequest extends NextApiRequest {
  body: Data;
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    body_frame,
    body_build_and_musculature,
    complexion,
    skin,
    teeth,
    nails,
    eyes,
    lips,
    hair,
    weight,
    movements_and_physical_activities,
    tolerance_for_seasonal_weather,
    disease_resistant_and_healing_capacity,
    food_habits,
    appetite,
    digestion,
    bowel_movements,
    liking_towards_various_taste,
    communication_speech,
    capabilities_activity_level,
    memory_intellectual_level,
    ageing,
    emotions,
    sleep,
    personality_strengths,
    featured_traits,
    email,
  } = req.body;

  const bodyFrame = ['', '', ''];

  try {
    await setDoc(doc(db, 'users_characteristics', email), req.body);
    res.status(200).send({ success: true });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: 'Sorry, Some error occured at our side!',
    });
  }
}
