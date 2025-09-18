<?php

namespace Tests\Browser;

use App\Models\Contact;
use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Tests\Browser\Pages\ContactsPage;

/**
 * Class ContactsPageTest
 *
 * Browser tests for the Contacts page.
 *
 * Tests include:
 * - Page headings and descriptions
 * - Toolbar elements (search input, Import/Export/Add Contact buttons)
 *
 * @package Tests\Browser
 */
final class ContactsPageTest extends DuskTestCase
{
    /**
     * Helper method to browse the Contacts page and execute assertions.
     *
     * @param callable $callback
     * @return void
     */
    private function browseContactsPage(callable $callback): void
    {
        $this->browse(function (Browser $browser) use ($callback) {
            $browser->visit(new ContactsPage());
            $callback($browser);
        });
    }

    /**
     * Test that the contacts page loads successfully and displays
     * the expected table headings.
     *
     * @return void
     */
    public function test_contacts_page_loads_with_expected_headings(): void
    {
        $this->browseContactsPage(function (Browser $browser) {
            $browser->assertSee('Contacts')
                ->assertSee('Manage your customer contact list');
        });
    }

    /**
     * Test that the contacts page toolbar displays all toolbar elements.
     *
     * This includes:
     * - The main toolbar container
     * - Search input with placeholder
     * - Action buttons: Import, Export, Add Contact
     *
     * @return void
     */
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

    /**
     * Test that the contacts page table displays "No contacts yet" message when there are no contacts.
     *
     * @return void
     */
    public function test_contacts_page_table_displays_no_contacts_yet_when_there_is_non(): void
    {
        $this->browseContactsPage(function (Browser $browser) {
            !(Contact::count() > 0) ?
                $browser->assertSee('No contacts yet. Add your first contact to get started.') :
                $browser->assertDontSee('No contacts yet. Add your first contact to get started.');
        });
    }

    /**
     * Test that the contacts page displays the table with expected columns.
     *
     * Expected columns:
     * - Name
     * - Phone Number
     * - Email
     * - Tags
     * - Actions
     *
     * @return void
     */
    public function test_contacts_page_table_displays_expected_columns(): void
    {
        $this->markTestIncomplete('This test needs to be completed later.');
    }
}
