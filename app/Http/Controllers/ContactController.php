<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Contact;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\ContactRequest;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render(
            'ContactsPage',
            ['contacts' => Contact::all()->map(fn ($contact) => self::formate($contact))]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): void
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ContactRequest $request): JsonResponse
    {
        $contact = Contact::create($request->validated());

        return response()->json(self::formate($contact));
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact): void
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contact $contact): void
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ContactRequest $request, Contact $contact): JsonResponse
    {
        $contact->update($request->validated());

        return response()->json(self::formate($contact));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact): void
    {
        $contact->delete();
    }

    /**
     * Formats a Contact model instance into an associative array.
     *
     * @param Contact $contact The contact instance to format.
     * @return array<string,string|null> The formatted contact data.
     */
    private static function formate(Contact $contact): array
    {
        return [
            'id'           => (string)$contact->id,
            'last_name'    => $contact->last_name,
            'first_name'   => $contact->first_name,
            'phone_number' => $contact->phone_number,
            'created_at'   => $contact->created_at?->toDateTimeString(),
            'updated_at'   => $contact->updated_at?->toDateTimeString(),
        ];
    }
}
