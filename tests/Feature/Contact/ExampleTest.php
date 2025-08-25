<?php

namespace Tests\Feature\Contact;

use Tests\TestCase;

final class ExampleTest extends TestCase
{
    /**
     * Test that the contacts index route returns a 200 OK response.
     *
     * @return void
     */
    public function test_contacts_index_route_returns_successful_response(): void
    {
        $response = $this->get(route('contacts.index'));
        $response->assertOk();
    }
}
