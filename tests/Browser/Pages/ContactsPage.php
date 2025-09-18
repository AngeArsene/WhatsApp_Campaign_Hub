<?php

namespace Tests\Browser\Pages;

use Laravel\Dusk\Browser;
use Laravel\Dusk\Page as BasePage;

class ContactsPage extends BasePage
{
    public function url()
    {
        return '/contacts';
    }

    public function assert(Browser $browser)
    {
        $browser->assertPathIs($this->url());
    }
}
