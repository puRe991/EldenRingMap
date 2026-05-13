-- Allow newer map point filter values such as scadutreefragment and spiritashes
-- to be stored without truncation in existing installations.
ALTER TABLE `map`
  MODIFY COLUMN `type` VARCHAR(32) NOT NULL;
