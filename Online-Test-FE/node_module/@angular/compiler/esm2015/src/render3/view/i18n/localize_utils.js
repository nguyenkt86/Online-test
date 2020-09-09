import * as o from '../../../output/output_ast';
import { serializeIcuNode } from './icu_serializer';
import { formatI18nPlaceholderName } from './util';
export function createLocalizeStatements(variable, message, params) {
    const statements = [];
    const { messageParts, placeHolders } = serializeI18nMessageForLocalize(message);
    statements.push(new o.ExpressionStatement(variable.set(o.localizedString(message, messageParts, placeHolders, placeHolders.map(ph => params[ph])))));
    return statements;
}
class MessagePiece {
    constructor(text) {
        this.text = text;
    }
}
class LiteralPiece extends MessagePiece {
}
class PlaceholderPiece extends MessagePiece {
    constructor(name) {
        super(formatI18nPlaceholderName(name, /* useCamelCase */ false));
    }
}
/**
 * This visitor walks over an i18n tree, capturing literal strings and placeholders.
 *
 * The result can be used for generating the `$localize` tagged template literals.
 */
class LocalizeSerializerVisitor {
    visitText(text, context) {
        if (context[context.length - 1] instanceof LiteralPiece) {
            // Two literal pieces in a row means that there was some comment node in-between.
            context[context.length - 1].text += text.value;
        }
        else {
            context.push(new LiteralPiece(text.value));
        }
    }
    visitContainer(container, context) {
        container.children.forEach(child => child.visit(this, context));
    }
    visitIcu(icu, context) {
        context.push(new LiteralPiece(serializeIcuNode(icu)));
    }
    visitTagPlaceholder(ph, context) {
        context.push(new PlaceholderPiece(ph.startName));
        if (!ph.isVoid) {
            ph.children.forEach(child => child.visit(this, context));
            context.push(new PlaceholderPiece(ph.closeName));
        }
    }
    visitPlaceholder(ph, context) {
        context.push(new PlaceholderPiece(ph.name));
    }
    visitIcuPlaceholder(ph, context) {
        context.push(new PlaceholderPiece(ph.name));
    }
}
const serializerVisitor = new LocalizeSerializerVisitor();
/**
 * Serialize an i18n message into two arrays: messageParts and placeholders.
 *
 * These arrays will be used to generate `$localize` tagged template literals.
 *
 * @param message The message to be serialized.
 * @returns an object containing the messageParts and placeholders.
 */
export function serializeI18nMessageForLocalize(message) {
    const pieces = [];
    message.nodes.forEach(node => node.visit(serializerVisitor, pieces));
    return processMessagePieces(pieces);
}
/**
 * Convert the list of serialized MessagePieces into two arrays.
 *
 * One contains the literal string pieces and the other the placeholders that will be replaced by
 * expressions when rendering `$localize` tagged template literals.
 *
 * @param pieces The pieces to process.
 * @returns an object containing the messageParts and placeholders.
 */
function processMessagePieces(pieces) {
    const messageParts = [];
    const placeHolders = [];
    if (pieces[0] instanceof PlaceholderPiece) {
        // The first piece was a placeholder so we need to add an initial empty message part.
        messageParts.push('');
    }
    for (let i = 0; i < pieces.length; i++) {
        const part = pieces[i];
        if (part instanceof LiteralPiece) {
            messageParts.push(part.text);
        }
        else {
            placeHolders.push(part.text);
            if (pieces[i - 1] instanceof PlaceholderPiece) {
                // There were two placeholders in a row, so we need to add an empty message part.
                messageParts.push('');
            }
        }
    }
    if (pieces[pieces.length - 1] instanceof PlaceholderPiece) {
        // The last piece was a placeholder so we need to add a final empty message part.
        messageParts.push('');
    }
    return { messageParts, placeHolders };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemVfdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci9zcmMvcmVuZGVyMy92aWV3L2kxOG4vbG9jYWxpemVfdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUUEsT0FBTyxLQUFLLENBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUVoRCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRCxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFFakQsTUFBTSxVQUFVLHdCQUF3QixDQUNwQyxRQUF1QixFQUFFLE9BQXFCLEVBQzlDLE1BQXNDO0lBQ3hDLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUV0QixNQUFNLEVBQUMsWUFBWSxFQUFFLFlBQVksRUFBQyxHQUFHLCtCQUErQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlFLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FDbEQsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVsRyxPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDO0FBRUQsTUFBTSxZQUFZO0lBQ2hCLFlBQW1CLElBQVk7UUFBWixTQUFJLEdBQUosSUFBSSxDQUFRO0lBQUcsQ0FBQztDQUNwQztBQUNELE1BQU0sWUFBYSxTQUFRLFlBQVk7Q0FBRztBQUMxQyxNQUFNLGdCQUFpQixTQUFRLFlBQVk7SUFDekMsWUFBWSxJQUFZO1FBQ3RCLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLENB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QUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksSUFBSSxZQUFZLFlBQVksRUFBRTtZQUNoQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM5QjthQUFNO1lBQ0wsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0IsSUFBSSxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxZQUFZLGdCQUFnQixFQUFFO2dCQUM3QyxpRkFBaUY7Z0JBQ2pGLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDdkI7U0FDRjtLQUNGO0lBQ0QsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsWUFBWSxnQkFBZ0IsRUFBRTtRQUN6RCxpRkFBaUY7UUFDakYsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUN2QjtJQUNELE9BQU8sRUFBQyxZQUFZLEVBQUUsWUFBWSxFQUFDLENBQUM7QUFDdEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0ICogYXMgaTE4biBmcm9tICcuLi8uLi8uLi9pMThuL2kxOG5fYXN0JztcbmltcG9ydCAqIGFzIG8gZnJvbSAnLi4vLi4vLi4vb3V0cHV0L291dHB1dF9hc3QnO1xuXG5pbXBvcnQge3NlcmlhbGl6ZUljdU5vZGV9IGZyb20gJy4vaWN1X3NlcmlhbGl6ZXInO1xuaW1wb3J0IHtmb3JtYXRJMThuUGxhY2Vob2xkZXJOYW1lfSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTG9jYWxpemVTdGF0ZW1lbnRzKFxuICAgIHZhcmlhYmxlOiBvLlJlYWRWYXJFeHByLCBtZXNzYWdlOiBpMThuLk1lc3NhZ2UsXG4gICAgcGFyYW1zOiB7W25hbWU6IHN0cmluZ106IG8uRXhwcmVzc2lvbn0pOiBvLlN0YXRlbWVudFtdIHtcbiAgY29uc3Qgc3RhdGVtZW50cyA9IFtdO1xuXG4gIGNvbnN0IHttZXNzYWdlUGFydHMsIHBsYWNlSG9sZGVyc30gPSBzZXJpYWxpemVJMThuTWVzc2FnZUZvckxvY2FsaXplKG1lc3NhZ2UpO1xuICBzdGF0ZW1lbnRzLnB1c2gobmV3IG8uRXhwcmVzc2lvblN0YXRlbWVudCh2YXJpYWJsZS5zZXQoXG4gICAgICBvLmxvY2FsaXplZFN0cmluZyhtZXNzYWdlLCBtZXNzYWdlUGFydHMsIHBsYWNlSG9sZGVycywgcGxhY2VIb2xkZXJzLm1hcChwaCA9PiBwYXJhbXNbcGhdKSkpKSk7XG5cbiAgcmV0dXJuIHN0YXRlbWVudHM7XG59XG5cbmNsYXNzIE1lc3NhZ2VQaWVjZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZXh0OiBzdHJpbmcpIHt9XG59XG5jbGFzcyBMaXRlcmFsUGllY2UgZXh0ZW5kcyBNZXNzYWdlUGllY2Uge31cbmNsYXNzIFBsYWNlaG9sZGVyUGllY2UgZXh0ZW5kcyBNZXNzYWdlUGllY2Uge1xuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcihmb3JtYXRJMThuUGxhY2Vob2xkZXJOYW1lKG5hbWUsIC8qIHVzZUNhbWVsQ2FzZSAqLyBmYWxzZSkpO1xuICB9XG59XG5cbi8qKlxuICogVGhpcyB2aXNpdG9yIHdhbGtzIG92ZXIgYW4gaTE4biB0cmVlLCBjYXB0dXJpbmcgbGl0ZXJhbCBzdHJpbmdzIGFuZCBwbGFjZWhvbGRlcnMuXG4gKlxuICogVGhlIHJlc3VsdCBjYW4gYmUgdXNlZCBmb3IgZ2VuZXJhdGluZyB0aGUgYCRsb2NhbGl6ZWAgdGFnZ2VkIHRlbXBsYXRlIGxpdGVyYWxzLlxuICovXG5jbGFzcyBMb2NhbGl6ZVNlcmlhbGl6ZXJWaXNpdG9yIGltcGxlbWVudHMgaTE4bi5WaXNpdG9yIHtcbiAgdmlzaXRUZXh0KHRleHQ6IGkxOG4uVGV4dCwgY29udGV4dDogTWVzc2FnZVBpZWNlW10pOiBhbnkge1xuICAgIGlmIChjb250ZXh0W2NvbnRleHQubGVuZ3RoIC0gMV0gaW5zdGFuY2VvZiBMaXRlcmFsUGllY2UpIHtcbiAgICAgIC8vIFR3byBsaXRlcmFsIHBpZWNlcyBpbiBhIHJvdyBtZWFucyB0aGF0IHRoZXJlIHdhcyBzb21lIGNvbW1lbnQgbm9kZSBpbi1iZXR3ZWVuLlxuICAgICAgY29udGV4dFtjb250ZXh0Lmxlbmd0aCAtIDFdLnRleHQgKz0gdGV4dC52YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29udGV4dC5wdXNoKG5ldyBMaXRlcmFsUGllY2UodGV4dC52YWx1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIHZpc2l0Q29udGFpbmVyKGNvbnRhaW5lcjogaTE4bi5Db250YWluZXIsIGNvbnRleHQ6IE1lc3NhZ2VQaWVjZVtdKTogYW55IHtcbiAgICBjb250YWluZXIuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiBjaGlsZC52aXNpdCh0aGlzLCBjb250ZXh0KSk7XG4gIH1cblxuICB2aXNpdEljdShpY3U6IGkxOG4uSWN1LCBjb250ZXh0OiBNZXNzYWdlUGllY2VbXSk6IGFueSB7XG4gICAgY29udGV4dC5wdXNoKG5ldyBMaXRlcmFsUGllY2Uoc2VyaWFsaXplSWN1Tm9kZShpY3UpKSk7XG4gIH1cblxuICB2aXNpdFRhZ1BsYWNlaG9sZGVyKHBoOiBpMThuLlRhZ1BsYWNlaG9sZGVyLCBjb250ZXh0OiBNZXNzYWdlUGllY2VbXSk6IGFueSB7XG4gICAgY29udGV4dC5wdXNoKG5ldyBQbGFjZWhvbGRlclBpZWNlKHBoLnN0YXJ0TmFtZSkpO1xuICAgIGlmICghcGguaXNWb2lkKSB7XG4gICAgICBwaC5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IGNoaWxkLnZpc2l0KHRoaXMsIGNvbnRleHQpKTtcbiAgICAgIGNvbnRleHQucHVzaChuZXcgUGxhY2Vob2xkZXJQaWVjZShwaC5jbG9zZU5hbWUpKTtcbiAgICB9XG4gIH1cblxuICB2aXNpdFBsYWNlaG9sZGVyKHBoOiBpMThuLlBsYWNlaG9sZGVyLCBjb250ZXh0OiBNZXNzYWdlUGllY2VbXSk6IGFueSB7XG4gICAgY29udGV4dC5wdXNoKG5ldyBQbGFjZWhvbGRlclBpZWNlKHBoLm5hbWUpKTtcbiAgfVxuXG4gIHZpc2l0SWN1UGxhY2Vob2xkZXIocGg6IGkxOG4uSWN1UGxhY2Vob2xkZXIsIGNvbnRleHQ/OiBhbnkpOiBhbnkge1xuICAgIGNvbnRleHQucHVzaChuZXcgUGxhY2Vob2xkZXJQaWVjZShwaC5uYW1lKSk7XG4gIH1cbn1cblxuY29uc3Qgc2VyaWFsaXplclZpc2l0b3IgPSBuZXcgTG9jYWxpemVTZXJpYWxpemVyVmlzaXRvcigpO1xuXG4vKipcbiAqIFNlcmlhbGl6ZSBhbiBpMThuIG1lc3NhZ2UgaW50byB0d28gYXJyYXlzOiBtZXNzYWdlUGFydHMgYW5kIHBsYWNlaG9sZGVycy5cbiAqXG4gKiBUaGVzZSBhcnJheXMgd2lsbCBiZSB1c2VkIHRvIGdlbmVyYXRlIGAkbG9jYWxpemVgIHRhZ2dlZCB0ZW1wbGF0ZSBsaXRlcmFscy5cbiAqXG4gKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBiZSBzZXJpYWxpemVkLlxuICogQHJldHVybnMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG1lc3NhZ2VQYXJ0cyBhbmQgcGxhY2Vob2xkZXJzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplSTE4bk1lc3NhZ2VGb3JMb2NhbGl6ZShtZXNzYWdlOiBpMThuLk1lc3NhZ2UpOlxuICAgIHttZXNzYWdlUGFydHM6IHN0cmluZ1tdLCBwbGFjZUhvbGRlcnM6IHN0cmluZ1tdfSB7XG4gIGNvbnN0IHBpZWNlczogTWVzc2FnZVBpZWNlW10gPSBbXTtcbiAgbWVzc2FnZS5ub2Rlcy5mb3JFYWNoKG5vZGUgPT4gbm9kZS52aXNpdChzZXJpYWxpemVyVmlzaXRvciwgcGllY2VzKSk7XG4gIHJldHVybiBwcm9jZXNzTWVzc2FnZVBpZWNlcyhwaWVjZXMpO1xufVxuXG4vKipcbiAqIENvbnZlcnQgdGhlIGxpc3Qgb2Ygc2VyaWFsaXplZCBNZXNzYWdlUGllY2VzIGludG8gdHdvIGFycmF5cy5cbiAqXG4gKiBPbmUgY29udGFpbnMgdGhlIGxpdGVyYWwgc3RyaW5nIHBpZWNlcyBhbmQgdGhlIG90aGVyIHRoZSBwbGFjZWhvbGRlcnMgdGhhdCB3aWxsIGJlIHJlcGxhY2VkIGJ5XG4gKiBleHByZXNzaW9ucyB3aGVuIHJlbmRlcmluZyBgJGxvY2FsaXplYCB0YWdnZWQgdGVtcGxhdGUgbGl0ZXJhbHMuXG4gKlxuICogQHBhcmFtIHBpZWNlcyBUaGUgcGllY2VzIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgbWVzc2FnZVBhcnRzIGFuZCBwbGFjZWhvbGRlcnMuXG4gKi9cbmZ1bmN0aW9uIHByb2Nlc3NNZXNzYWdlUGllY2VzKHBpZWNlczogTWVzc2FnZVBpZWNlW10pOlxuICAgIHttZXNzYWdlUGFydHM6IHN0cmluZ1tdLCBwbGFjZUhvbGRlcnM6IHN0cmluZ1tdfSB7XG4gIGNvbnN0IG1lc3NhZ2VQYXJ0czogc3RyaW5nW10gPSBbXTtcbiAgY29uc3QgcGxhY2VIb2xkZXJzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIGlmIChwaWVjZXNbMF0gaW5zdGFuY2VvZiBQbGFjZWhvbGRlclBpZWNlKSB7XG4gICAgLy8gVGhlIGZpcnN0IHBpZWNlIHdhcyBhIHBsYWNlaG9sZGVyIHNvIHdlIG5lZWQgdG8gYWRkIGFuIGluaXRpYWwgZW1wdHkgbWVzc2FnZSBwYXJ0LlxuICAgIG1lc3NhZ2VQYXJ0cy5wdXNoKCcnKTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGllY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgcGFydCA9IHBpZWNlc1tpXTtcbiAgICBpZiAocGFydCBpbnN0YW5jZW9mIExpdGVyYWxQaWVjZSkge1xuICAgICAgbWVzc2FnZVBhcnRzLnB1c2gocGFydC50ZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGxhY2VIb2xkZXJzLnB1c2gocGFydC50ZXh0KTtcbiAgICAgIGlmIChwaWVjZXNbaSAtIDFdIGluc3RhbmNlb2YgUGxhY2Vob2xkZXJQaWVjZSkge1xuICAgICAgICAvLyBUaGVyZSB3ZXJlIHR3byBwbGFjZWhvbGRlcnMgaW4gYSByb3csIHNvIHdlIG5lZWQgdG8gYWRkIGFuIGVtcHR5IG1lc3NhZ2UgcGFydC5cbiAgICAgICAgbWVzc2FnZVBhcnRzLnB1c2goJycpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAocGllY2VzW3BpZWNlcy5sZW5ndGggLSAxXSBpbnN0YW5jZW9mIFBsYWNlaG9sZGVyUGllY2UpIHtcbiAgICAvLyBUaGUgbGFzdCBwaWVjZSB3YXMgYSBwbGFjZWhvbGRlciBzbyB3ZSBuZWVkIHRvIGFkZCBhIGZpbmFsIGVtcHR5IG1lc3NhZ2UgcGFydC5cbiAgICBtZXNzYWdlUGFydHMucHVzaCgnJyk7XG4gIH1cbiAgcmV0dXJuIHttZXNzYWdlUGFydHMsIHBsYWNlSG9sZGVyc307XG59XG4iXX0=