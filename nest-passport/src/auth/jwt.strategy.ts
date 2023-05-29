import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';
import jwt, { Secret, GetPublicKeyOrSecret } from 'jsonwebtoken';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      algorithms: ['RS256'],
      secretOrKeyProvider: (
        request: any,
        rawJwtToken: string,
        done: (err: any, secretOrPublicKey?: string | object) => void,
      ) => {
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
        const decodedToken = jwt.decode(token, { complete: true });
        if (!decodedToken) {
          return done('Invalid token');
        }

        const { header } = decodedToken;
        const { alg, kid } = header;
        const jwksClient = jwksRsa({
          jwksUri: 'http://localhost/',
        });
        jwksClient.getSigningKey(kid, (err, key) => {
          if (err) {
            return done(err);
          }
          const signingKey = key.getPublicKey();
          done(null, signingKey);
        });
      },
    });
  }
}