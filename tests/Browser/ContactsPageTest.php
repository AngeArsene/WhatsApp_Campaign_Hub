<?php

namespace Tests\Browser;

use App\Models\Contact;
use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Tests\Browser\Pages\ContactsPage;
use PHPUnit\Framework\Attributes\Depends;
use Illuminate\Foundation\Testing\DatabaseMigrations;

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
    use DatabaseMigrations;

    /**
     * Helper method to browse the Contacts page and execute assertions.
     *
     * @param callable $callback
     * @return void
     */
    protected function browseContactsPage(callable $callback): void
    {
        $this->browse(function (Browser $browser) use ($callback) {
            $browser->visit(new ContactsPage());
            $callback($browser);
        });
    }

    /**
     * Helper method to browse to the Contacts page and open the contact form.
     *
     * @param callable $callback
     * @return void
     */
    protected function browseContactsPageAndOpenContactForm(callable $callback): void
    {
        $this->browseContactsPage(function (Browser $browser) use ($callback) {
            $browser->click('@add-contact-button')
                ->waitFor('@add-contact-form');

            $callback($browser);
        });
    }

    /**
     * Helper method to browse to the Contacts page and open the contact form fill the form and submit.
     *
     * @param callable $callback
     * @return void
     */
    protected function browseContactsPageAndFillContactForm(callable $callback): void
    {
        $this->browseContactsPageAndOpenContactForm(function (Browser $browser) use ($callback) {
            $last_name    = fake()->lastName;
            $first_name   = fake()->firstName;
            $phone_number = fake_cameroon_phone_number();

            $browser->assertVisible('@add-contact-form')
                ->type('last_name', $last_name)
                ->type('first_name', $first_name)
                ->type('phone_number', $phone_number)
                ->click('@contact-form-submit-button');

            $callback($browser, $first_name, $last_name, $phone_number);
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
     * Test that the contacts page displays the table with expected columns.
     *
     * Expected columns:
     * - Name
     * - Phone Number
     * - CREATED
     * - UPDATED
     *
     * @return void
     */
    public function test_contacts_page_table_displays_expected_columns(): void
    {
        $this->browseContactsPage(function (Browser $browser) {
            $browser->assertSee('NAME')
                ->assertSee('PHONE NUMBER')
                ->assertSee('CREATED')
                ->assertSee('UPDATED');
        });
    }

    /**
     * Test that the contacts page table displays "No contacts yet" message when there are no contacts.
     *
     * @return void
     */
    public function test_contacts_page_table_displays_no_contacts_yet_when_there_is_non(): void
    {
        Contact::query()->delete();
        $no_contacts_yet_text = 'No contacts yet. Add your first contact to get started.';

        $this->browseContactsPage(function (Browser $browser) use ($no_contacts_yet_text) {
            $browser->assertSee($no_contacts_yet_text);
        });

        Contact::factory()->create();

        $this->browseContactsPage(function (Browser $browser) use ($no_contacts_yet_text) {
            $browser->assertDontSee($no_contacts_yet_text);
        });
    }

    /**
     * Test that the contacts page add contact button show popup form when clicked on.
     *
     * @return void
     */
    #[Depends('test_contacts_page_toolbar_elements_are_visible')]
    public function test_contacts_page_add_contact_button_show_popup_form_when_clicked_on(): void
    {
        $this->browseContactsPageAndOpenContactForm(function (Browser $browser) {
            $browser->assertVisible("@add-contact-form");
        });
    }

    /**
     * Test that the contacts page add contact form closes after successful submission.
     *
     * @return void
     */
    #[Depends('test_contacts_page_add_contact_button_show_popup_form_when_clicked_on')]
    public function test_contacts_page_add_contact_form_closes_after_successful_submission(): void
    {
        $this->browseContactsPageAndFillContactForm(function (Browser $browser) {
            $browser->waitUntilMissing('@add-contact-form', 10) // wait up to 10s
                ->assertMissing('@add-contact-form');
        });
    }

    /**
     * Test that the contacts page add contact form closes after successful submission.
     *
     * @return void
     */
    #[Depends('test_contacts_page_add_contact_form_closes_after_successful_submission')]
    public function test_contacts_page_added_contact_displays_when_add_contact_form_is_filled_and_submitted(): void
    {
        $this->browseContactsPageAndFillContactForm(function (
            Browser $browser,
            string  $first_name,
            string  $last_name,
            string  $phone_number
        ) {
            $browser->waitUntilMissing('@add-contact-form', 10) // wait up to 10s
                ->assertMissing('@add-contact-form')
                ->assertSee($last_name)
                ->assertSee($first_name)
                ->assertSee($phone_number);
        });
    }

    /**
     * Test that the contacts page add contact form closes after successful submission.
     *
     * @return void
     */
    public function test_contacts_page_delete_contact_button_shows_alert_on_click(): void
    {
        Contact::factory()->create();

        $this->browseContactsPage(function (Browser $browser) {
            $browser->waitFor('@delete-contact-button', 10)
                ->click('@delete-contact-button')
                ->waitForDialog()
                ->assertDialogOpened("Are you sure you want to delete this contact?");
        });
    }
}
