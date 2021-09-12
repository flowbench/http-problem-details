// deno-lint-ignore-file
import { ProblemDocument, ProblemDocumentExtension } from './mod.ts'

import { assertEquals, assertThrows } from "https://deno.land/std@0.88.0/testing/asserts.ts";

Deno.test('When creating a Problem Document with type and title: should contain a title', (): void => {

    const type = 'http://tempuri.org/my-problem'
    const title = 'something went wrong'
    const doc = new ProblemDocument({ type, title })

    assertEquals(doc.title, title);
    assertEquals(doc.type, type);
})

Deno.test('When creating a Problem Document with invalid URI type member: should throw an error', (): void => {

    const type = 123;

    function throwTestError () {
        // @ts-ignore: testing
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const doc = new ProblemDocument({ type })
    }

    assertThrows(throwTestError);

})

Deno.test('When creating a Problem Document with an Extension: should contain extension', (): void => {
  
  const type = 'http://tempuri.org/my-problem'
  const title = `something went wrong`
  const extensionName = 'invalid-params'
  const extensionValue = 'test'
  const extension = new ProblemDocumentExtension({ 'invalid-params': extensionValue })
  const doc = new ProblemDocument({ type, title }, extension)
  
  // @ts-ignore 
  assertEquals(doc[extensionName], extensionValue);

});
  
Deno.test('When creating a Problem Document with an Extension: should contain extension: should contain extension added as plain object', (): void => {

    const type = 'http://tempuri.org/my-problem'
    const title = `something went wrong`
    const extensionName = 'invalid-params'
    const extensionValue = 'test'
    const extension = { 'invalid-params': extensionValue }
    const doc = new ProblemDocument({ type, title }, extension)

    // @ts-ignore
    assertEquals(doc[extensionName], extensionValue);
});

Deno.test('When creating a Problem Document with status member: should contain status member', (): void => {
    const status = 400
    const doc = new ProblemDocument({ status })

    assertEquals(doc.status, status);
});


Deno.test('When creating a Problem Document with detail member: should contain detail member', (): void => {

    const detail = 'Your current balance is 30, but that costs 50.'
    const doc = new ProblemDocument({ detail })

    assertEquals(doc.detail, detail);

})

Deno.test('When creating a Problem Document with empty string detail: should not contain detail member', (): void => {
    const doc = new ProblemDocument({ detail: '' })

    assertEquals(doc['detail'], undefined)

})

Deno.test('When creating a Problem Document with instance member: should contain instance member', (): void => {

    const instance = '/account/12345/msgs/abc'
    const doc = new ProblemDocument({ instance })

    assertEquals(doc.instance,instance);
})

Deno.test('When creating a Problem Document with invalid URI instance member: should throw an error', (): void => {

    const instance = 123

    function throwTestError() {
      // @ts-ignore: testing
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const doc = new ProblemDocument({ instance })
    }

    assertThrows(throwTestError)
})

Deno.test('When creating a Problem Document only with status member: should contain status member', (): void => {

    const status = 400
    const doc = new ProblemDocument({ status })

    assertEquals(doc.status, status);

});

Deno.test('When creating a Problem Document only with status member: should have type about:blank', (): void => {
  
  const status = 400
  const doc = new ProblemDocument({ status })
  
  assertEquals(doc.type, 'about:blank');
});
  
Deno.test('When creating a Problem Document only with status member: should have title of status code per HTTP spec (e.g. 400 - Bad Request', (): void => {

    const status = 400
    const doc = new ProblemDocument({ status })

    assertEquals(doc.title, 'Bad Request');
});
