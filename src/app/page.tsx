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
    <div className="w-full h-full">
      <Confetti success={!!success} />
      <main className="py-3 h-[calc(100%-96px)] overflow-auto">
        <div className="container mx-auto">
          <div className="mb-5">
            {success && (
              <Alert className="bg-green-700 z-10">
                <PartyPopper />
                <AlertTitle>Thats Correct!</AlertTitle>
                <AlertDescription>
                  You did it! All is left to get the present!
                </AlertDescription>
              </Alert>
            )}
            {failure && (
              <Alert className="bg-red-700 z-10">
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
        </div>
      </main>
      <form
        action={action}
        className="fixed bottom-0 py-3 w-full rounded-t-md bg-muted z-10"
      >
        <div className="container mx-auto flex flex-col gap-2">
          <label htmlFor="answer">Your Answer?</label>
          <div className="flex gap-6 items-center">
            <Input
              defaultValue={answer}
              id="answer"
              name="answer"
              placeholder="Write your answer here"
              className="h-10"
            />
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
