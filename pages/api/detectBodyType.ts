// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { UserCharacteristics } from '@/types/typings';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: UserCharacteristics;
}

type Data = {
  vata: number;
  pitta: number;
  kapha: string;
};

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

  //   if (
  //     !email ||
  //     !fname ||
  //     !lname ||
  //     !image ||
  //     !username ||
  //     !age ||
  //     !gender ||
  //     !bio
  //   ) {
  //     res.status(400).send({ success: false, error: 'Incorrect data provided' });
  //   }

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
