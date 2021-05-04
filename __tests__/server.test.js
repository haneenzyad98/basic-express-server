'use strict';

const server = require('../src/server');

const superTest = require('supertest');
const serverRequest = superTest(server.app);


describe('Server Module', ()=> {
    it('404 on a bad route', async ()=> {
        let response = await serverRequest.get('/not-found-route');
        expect(response.status).toEqual(404);
    });
    it('404 on a bad method', async ()=> {
        let response = await serverRequest.post('/person');
        expect(response.status).toEqual(404);
    });

    it('500 if no name in the query string', async ()=> {
        let response = await serverRequest.get('/person');
        
        expect(response.status).toEqual(500);
        
    });

    it('200 if the name is in the query string', async ()=> {
        let response = await serverRequest.get('/person?name=x');
        
        expect(response.status).toEqual(200);
    });
    it('response object is correct', async ()=> {
        let response = await serverRequest.get('/person?name=z');
        expect(response.status).toEqual(200);
        // console.log(response);
        expect(response.body).toEqual({
            name: "z"
        });
    });
});
