import { ReadOnlyCode } from '@/components/readonlycode';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { redirect } from 'next/navigation';
import { AlertCircle, PartyPopper } from 'lucide-react';
import { Confetti } from '@/components/confetti';
import { code } from './code';

export default async function Home({
  searchParams: { success, failure, answer },
}: {
  searchParams: {
    success?: boolean;
    failure?: boolean;
    answer?: string;
  };
}) {
  const dontNeedType = !!(success || failure);

  const action = async (formData: FormData) => {
    'use server';

    const answer = formData.get('answer');
    if (
      answer === 'redmart box' ||
      answer === 'The place of the present is: redmart box'
    ) {
      redirect(`?answer=${answer}&success=true`);
    }
    redirect(`?answer=${answer}&failure=true`);
  };

  return (
    <div className="w-full">
      <Confetti success={!!success} />
      <main className="container mx-auto p-3 h-full">
        <div className="mb-5">
          {success && (
            <Alert className="bg-green-700">
              <PartyPopper />
              <AlertTitle>Thats Correct!</AlertTitle>
              <AlertDescription>
                You did it! All is left to get the present!
              </AlertDescription>
            </Alert>
          )}
          {failure && (
            <Alert className="bg-red-700">
              <AlertCircle />
              <AlertTitle>That's Wrong!</AlertTitle>
              <AlertDescription>
                Ooops! Don't give up! Try again?
              </AlertDescription>
            </Alert>
          )}
        </div>
        <h1 className="text-4xl font-bold mb-2">Can you solve this code?</h1>
        <p className="text-muted-foreground">
          Solve this code to get the location of your present
        </p>
        <p className="text-muted-foreground mb-5">P.S. Don't Cheat 😜</p>
        <ReadOnlyCode value={code} type={!dontNeedType} />
      </main>
      <form
        action={action}
        className="absolute bottom-0 w-full rounded-md bg-muted space-y-2"
      >
        <div className="container mx-auto">
          <label htmlFor="answer">Your Answer?</label>
          <div className="flex gap-6">
            <Input
              defaultValue={answer}
              id="answer"
              name="answer"
              placeholder="answer"
            />
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
