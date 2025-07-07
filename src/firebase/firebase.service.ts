import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as fs from 'fs';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private messaging: any;

  onModuleInit() {
    const serviceAccountPath = process.env.FIREBASE_CREDENTIAL_PATH;

    if (!serviceAccountPath || !fs.existsSync(serviceAccountPath)) {
      throw new Error(
        'Firebase service account JSON not found or path is invalid',
      );
    }

    const serviceAccount = JSON.parse(
      fs.readFileSync(serviceAccountPath, 'utf8'),
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    this.messaging = admin.messaging();
  }

  sendToOne(token: string, payload: admin.messaging.MessagingPayload) {
    return this.messaging.sendToDevice(token, payload);
  }

  sendToMany(tokens: string[], payload: admin.messaging.MessagingPayload) {
    return this.messaging.sendToDevice(tokens, payload);
  }
}
