<?php

namespace Tests\Browser\Pages;

use Laravel\Dusk\Browser;
use Laravel\Dusk\Page as BasePage;

/**
 * Class ContactsPage
 *
 * Represents the Contacts page for Laravel Dusk browser tests.
 *
 * @package Tests\Browser\Pages
 */
class ContactsPage extends BasePage
{
    /**
     * Get the URL of the Contacts page.
     *
     * @return string The relative URL of the page
     */
    public function url(): string
    {
        return '/contacts';
    }

    /**
     * Assert that the browser is currently on the Contacts page.
     *
     * @param Browser $browser The Dusk browser instance
     * @return void
     */
    public function assert(Browser $browser): void
    {
        $browser->assertPathIs($this->url());
    }
}
