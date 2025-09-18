<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Tests\Browser\Pages\ContactsPage;

final class ExampleTest extends DuskTestCase
{
    protected function browseContactsPage(callable $callback): void
    {
        $this->browse(function (Browser $browser) use ($callback) {
            $browser->visit(new ContactsPage());
            $callback($browser);
        });
    }

    /**
     * A basic browser test example.
     */
    public function test_contacts_page_loads_with_expected_headings(): void
    {
        $this->browseContactsPage(function (Browser $browser) {
            $browser->assertSee('Contacts')
                ->assertSee('Manage your customer contact list');
        });
    }

    public function test_contacts_page_toolbar_elements_are_visible(): void
    {
        $this->browseContactsPage(function (Browser $browser) {
            // Check if the main container div exists
            $browser->assertPresent('div.p-4.border-b.border-gray-200')
                // Check for input with specific placeholder
                ->assertPresent('input[placeholder="Search contacts..."]')

                // Check buttons inside their parent div
                ->assertSeeIn('div.flex.space-x-2 > button:nth-of-type(1)', 'Import')
                ->assertSeeIn('div.flex.space-x-2 > button:nth-of-type(2)', 'Export')
                ->assertSeeIn('div.flex.space-x-2 > button:nth-of-type(3)', 'Add Contact');
        });
    }
}
