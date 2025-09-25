<?php

if (! function_exists('fake_cameroon_phone_number')) {
    /**
     * Generate a random valid Cameroon phone number.
     *
     * @return string
     */
    function fake_cameroon_phone_number(): string
    {
        return '+2376'
            . ['5', '7', '9'][random_int(0, 2)]
            . str_pad((string) random_int(0, 9999999), 7, '0', STR_PAD_LEFT);
    }
}
