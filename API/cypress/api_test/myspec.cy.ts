describe('Prueba API Opcion 2', () => {

    before(()=>{
        cy.request({
            failOnStatusCode: false,
            method: 'DELETE',
            url: `/pet/0`,
            headers: {
                "api_key": "special-key"
            }
        })
    })
    const id: number = 1;

    it('Add a pet', () => {
        cy.request({
            method: 'POST',
            url: '/pet',
            body: {
                "id": id,
                "category": {
                    "name": "Dog"
                },
                "name": "Pitbull",
                "tags": [
                    {
                        "name": "dog"
                    }
                ],
                "status": "available"
            }
        }).then((response) => {
            expect(response.status).to.not.eq(400);
            expect(response.status).to.eq(200);
            expect(response.body.id).to.eq(id);
            expect(response.body.name).to.include('Pitbull');
        })
    });

    it('Get a pet by ID', () => {
        cy.request({
            failOnStatusCode: false,
            method: 'GET',
            url: `/pet/0`
        }).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body.message).to.include('Pet not found');
        });

        cy.request({
            method: 'GET',
            url: `/pet/${id}`
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.id).to.eq(id);
            expect(response.body.name).to.include('Pitbull');
        })
    });

    it('Update pet name and status to sold', () => {
        cy.request({
            method: 'PUT',
            url: '/pet',
            body: {
                "id": id,
                "category": {
                    "name": "Dog"
                },
                "name": "Bulldog",
                "tags": [
                    {
                        "name": "dog"
                    }
                ],
                "status": 'sold'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.id).to.eq(id);
            expect(response.body.name).to.not.include('Pitbull');
            expect(response.body.name).to.include('Bulldog');
            expect(response.body.status).to.include('sold');
        })
    });

    it('Get pet by status', () => {
        cy.request({
            method: 'GET',
            url: '/pet/findByStatus?status=sold',
        }).then((response) => {
            expect(response.status).to.eq(200);
            const modifiedPet: any = Array.from(response.body).find((object: any) => object.id === id);

            expect(modifiedPet.name).to.include('Bulldog');
        });
    });

    after(() => {
        cy.request({
            method: 'DELETE',
            url: `/pet/${id}`,
            headers: {
                "api_key": "special-key"
            }
        }).then((res) => {
            expect(res.status).to.eq(200)
        })
    });
});