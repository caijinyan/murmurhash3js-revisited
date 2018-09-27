export default `uint64_t *ints = (uint64_t*) bytes;
for (int i = 0; i < 2; i++) {
  printf("%016llx", ints[i]);
}
printf("\\n");`;
